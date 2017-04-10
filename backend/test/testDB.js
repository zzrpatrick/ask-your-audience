var Poll = require('../poll.js');
var Profile = require('../profile.js');
var db = require('../db.js');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('DB', function() {
    describe('insert', function() {
        afterEach(function() {
            Poll.prototype.save.restore();
        });

        it('returns poll data on successful save', function() {
            var id = 1, q = 'question', o = ['a', 'b', 'c'], ip = "123.456.789.123";
            var expectedResults = {pollID : id, question: q, options : o, votes : [0, 0, 0], owner : ip};
            sinon.stub(Poll.prototype, 'save').returns(Promise.resolve(expectedResults));
            
            return db.insert(id, q, o, ip).then(result => expect(result).to.equal(expectedResults));
        }); 
    });

    describe('getPolls', function() {
        var query = {
                limit : function(limit) {},
                sort : function(sort) {},
                exec : function(exec) {}
        };

        beforeEach(function() {
            sinon.stub(Poll, 'find').returns(query);
            sinon.stub(query, 'sort').returns(query);
            sinon.stub(query, 'limit').returns(query);
        });

        afterEach(function() {
            Poll.find.restore();
            query.sort.restore();
            query.limit.restore();
        });

        it('calls find() only once when no options are given', function() {
            db.getPolls();

            sinon.assert.calledOnce(Poll.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls only find() twice once when only criteria is given', function() {
            db.getPolls({criteria : {pollID : 1}});

            sinon.assert.calledTwice(Poll.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls sort() once when only sort is given', function() {
            db.getPolls({sort : "ascending"});

            sinon.assert.calledOnce(Poll.find);
            sinon.assert.calledOnce(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls limit() once when only limit is given', function() {
            db.getPolls({limit : 1});

            sinon.assert.calledOnce(Poll.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.calledOnce(query.limit);
        }); 
    });

    describe('findOneAndUpdate', function(){
    	afterEach(function() {
            Poll.findOneAndUpdate.restore();
        });

        it('returns null when poll does not exist', function() {
            var findOneAndUpdateResult = {
               exec : function(exec) {
               	return Promise.resolve(null);
               }
       		};
            sinon.stub(Poll, 'findOneAndUpdate').returns(findOneAndUpdateResult);
            var id = 0, index = 1, expectedValue = null;

            return db.findOneAndUpdate(id, index).then(result => expect(result).to.equal(expectedValue));
        });
        
        it ('returns poll with updated vote count', function() {
            var findOneAndUpdateResult = {
               exec : function(exec) {
               	return Promise.resolve([{pollID : 1, question: "question 1", options : ["a", "b", "c"], votes : [0, 1, 0], owner : "123.456.789.123"}]);
               }
       		};
            sinon.stub(Poll, 'findOneAndUpdate').returns(findOneAndUpdateResult);
            var id = 1, index = 1, expectedNumVotes = 1;

            return db.findOneAndUpdate(id, index).then(result => expect(result[0].votes[1]).to.equal(expectedNumVotes));
        });
    });

    describe('findOneAndRemove', function(){
    	afterEach(function() {
            Poll.findOneAndRemove.restore();
        });

        it('returns null when poll does not exist', function() {
            var findOneAndRemoveResult = {
               exec : function(exec) {
               	return Promise.resolve(null);
               }
       		};
            sinon.stub(Poll, 'findOneAndRemove').returns(findOneAndRemoveResult);
            var id = 0, expectedValue = null;

            return db.findOneAndRemove(id).then(result => expect(result).to.equal(expectedValue));
        });
        
        it ('returns poll when poll does exist', function() {
            var findOneAndRemoveResult = {
               exec : function(exec) {
               	return Promise.resolve([{pollID : 1, question: "question 1", options : ["a", "b", "c"], votes : [0, 1, 0], owner : "123.456.789.123"}]);
               }
       		};
            sinon.stub(Poll, 'findOneAndRemove').returns(findOneAndRemoveResult);
            var id = 1, expectedPollID = 1;

            return db.findOneAndRemove(id).then(result => expect(result[0].pollID).to.equal(expectedPollID));
        });
    });    

    describe('createProfile', function () {
        afterEach(function() {
            Profile.prototype.save.restore();
        });

        it('returns profile data on successful save', function () {
            var id = 1, user = 'bob1', pass = 'password', display = 'Bob', votes = [];
            var expectedResults = {profileID : id, username : user, password : pass, displayName : display, votedPolls : votes};
            sinon.stub(Profile.prototype, 'save').returns(Promise.resolve(expectedResults));
            
            return db.createProfile(id, user, pass, display, votes).then(result => expect(result).to.equal(expectedResults));
        });

        it('returns null when username is already taken', function () {
            var id = 1, user = 'bob1', pass = 'password', display = 'Bob', votes = [];
            var expectedResults = {profileID : id, username : user, password : pass, displayName : display, votedPolls : votes};
            sinon.stub(Profile.prototype, 'save').returns(Promise.resolve(expectedResults));
            
            return db.createProfile(id, user, pass, display, votes).then(result => expect(result).to.equal(expectedResults));
        });
    });

    describe('getProfiles', function() {
        var query = {
                limit : function(limit) {},
                sort : function(sort) {},
                exec : function(exec) {}
        };

        beforeEach(function() {
            sinon.stub(Profile, 'find').returns(query);
            sinon.stub(query, 'sort').returns(query);
            sinon.stub(query, 'limit').returns(query);
        });

        afterEach(function() {
            Profile.find.restore();
            query.sort.restore();
            query.limit.restore();
        });

        it('calls find() only once when no options are given', function() {
            db.getProfiles();

            sinon.assert.calledOnce(Profile.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls only find() twice once when only criteria is given', function() {
            db.getProfiles({criteria : {ProfileID : 1}});

            sinon.assert.calledTwice(Profile.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls sort() once when only sort is given', function() {
            db.getProfiles({sort : "ascending"});

            sinon.assert.calledOnce(Profile.find);
            sinon.assert.calledOnce(query.sort);
            sinon.assert.notCalled(query.limit);
        });

        it('calls limit() once when only limit is given', function() {
            db.getProfiles({limit : 1});

            sinon.assert.calledOnce(Profile.find);
            sinon.assert.notCalled(query.sort);
            sinon.assert.calledOnce(query.limit);
        }); 
    });
});