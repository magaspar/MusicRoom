import mongoose from 'mongoose';
import MusicModel from './musicModel';

const uniqueValidator = require('mongoose-unique-validator');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  allowVotes: {
    type: Boolean,
    required: true,
    default: false,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserModel',
  },
  admins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserModel',
  },
  bans: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserModel',
    default: [],
  },
  publicFlag: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  authorName: {
    type: String,
  },
  delegatedPlayerAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  roomType: {
    type: String,
    default: 'radio',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dateTwo: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
  privateId: {
    type: String,
  },
  musics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'MusicModel',
    default: [],
  },
});
playlistSchema.plugin(uniqueValidator);

/*
    Erase all musics associated with the playlist before removing it.
 */

playlistSchema.pre('remove', function (next) {
  MusicModel.find({ playlist: this._id }, (error, musics) => {
    if (error) {
      console.error(error.msg);
    } else if (musics.length) {
      musics.forEach((music) => {
        music.remove();
      });
    }
    next();
  });
});

const PlaylistModel = mongoose.model('PlaylistModel', playlistSchema);

export default PlaylistModel;
