// Models for the collections
const Comment = require('./models/comments');
const Event = require('./models/events');

// Reuired dependencies
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const mongoose = require('mongoose');

// Get a free food event by id
router.get('/events', async (req,res,next) => {
  let event_id=req.query.id;

  try {
    // Find One event, if not, throw error
    const eventFound = await Event.findOne({id: event_id,});
    if(eventFound==null) {
      throw "Sorry, no events with that ID were found";
    }
    else {
      res.send(eventFound);
    }
  } catch(e) {
    res.status(400).send(e);
  }
});

// List all free food events
router.get('/events', async (req,res)=>{
  let eventFound = await Event.find({});
  res.send(eventFound);
});

// Add a free food event
router.post('/events', async (req,res)=>{
  // Counts up number of documents to generate unique id
  let count = await Event.countDocuments({});
  try {
    // If the necessary variables were not sent over
    if(req.body.title == null || req.body.time == null || req.body.location == null){
      throw "Sorry, you did not provide all the information needed for an event (title,time,location)";
    }
    // Create the event with the variables
    await Event.create({
      id: count,
      title: req.body.title,
      time: req.body.time,
      location: req.body.location,
    });
    res.send({status: 200});
  } catch(e) {
    res.status(400).send(e);
  }
});

// Update a free food event by id
router.post('/events:id', async (req,res)=>{
  let event_id=req.query.id;
  try {
    // Find one event and update, if the event cannot be found, throw error
    const eventUpdated = await Event.findOneAndUpdate({id: event_id}, {$set:{food: req.body.food,}});
    if(eventUpdated==null) {
      throw "Sorry, no events with that ID were found";
    }
    else {
      res.send({status: 200});
    }
  } catch(e) {
    res.status(400).send(e);
  }
});

// Delete a free food event
router.delete('/events', async (req,res)=>{
  let event_id=req.query.id;
  try {
    // Delete the event, if the event cannot be dound, throw error
    const eventDeleted = await Event.deleteOne({id: event_id});
    if(eventDeleted.deletedCount==0) {
      throw "Sorry, no events with that ID were found";
    }
    else {
      // Delete all the comments with the eventId
      const commentsDeleted = await Comment.deleteMany({eventId: event_id});
      res.send({status: 200});
    }
  } catch(e) {
    res.status(400).send(e);
  }
});

// Get comments for an event
router.get('/events/comments/', async (req,res)=>{
  let event_id=req.query.eventId;
  let commentsFound = await Comment.find({ eventId: event_id});
  res.send(commentsFound);
});

// Add a comment to an event
router.post('/events/comments/', async (req,res)=>{
  let event_id=req.query.eventId;
  // Counts up number of documents to generate unique id
  let count = await Comment.countDocuments({});
  try {
    // If the necessary variables were not sent over
    if(req.body.text == null || req.body.user == null || event_id == null){
      throw "Sorry, you did not provide all the information needed for a comment (text,user,eventId)";
    }
    // Create the comment
    await Comment.create({
      id: count,
      text: req.body.text,
      user: req.body.user,
      eventId: event_id,
    });
    res.send({status: 200});
  } catch(e) {
    res.status(400).send(e);
  }
});

// Delete a comment by id
router.delete('/events/comments/', async (req,res)=>{
  let comment_id=req.query.id;
  try {
    // Delete a comment, if the comment cannot be found, throw error
    const commentDeleted = await Comment.deleteOne({id: comment_id});
    if(commentDeleted.deletedCount==0) {
      throw "Sorry, no comments with that ID were found";
    }
    else {
      res.send({status: 200});
    }
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
