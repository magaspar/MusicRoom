import CustomError from './errorHandler';

const server = 'http://10.4.6.3:3000/api';

function login(userName, password) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: userName, password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        } else {
          reject(new CustomError(data.msg, data.status));
        }
      })
      .catch((error) => {
        console.error(error);
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function addUser(userName, password, name, familyName, email) {
  fetch(`${server}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: userName, password, name, familyName, email,
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        alert(data.msg);
      } else {
        alert(`error ${data.status}: ${data.msg}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function sendEmailToken(loginOrEmail) {
  fetch(`${server}/users/emailToken/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ loginOrEmail }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        alert('An email has been sent');
      } else {
        alert(`error ${data.status}: ${data.msg}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function sendPasswordToken(loginOrEmail) {
  fetch(`${server}/users/passToken/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ loginOrEmail }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        alert('An email has been sent');
      } else {
        alert(`error ${data.status}: ${data.msg}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function updatePassword(userId, password) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/users/newPass/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, password }),
    })
      .then(
        resolve({
          status: 200,
          data: { msg: 'Password Updated' },
        }),
      )
      .catch((error) => {
        console.error(error);
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function getPlaylists() {
  return new Promise((resolve, reject) => {
    fetch(`${server}/playlists`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          // alert('GetAllPlaylists is success');
          resolve({
            status: 200,
            data,
          });
        } else if (response.status === 404) {
          reject(new CustomError('Page Not Found', 404));
        } else {
          reject(new CustomError(data.msg, data.status));
          // alert(`error ${data.status}: ${data.msg}`);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(new CustomError(error.msg, error.status));
        // console.error(error);
      });
  });
}

function getPlaylistById(playlistId) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function getMusicsByVoteInPlaylist(playlistId) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/musicsByVote/${playlistId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function voteMusic(userId, musicId, playlistId, value) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/voteMusic`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId, musicId, playlistId, value,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        } else {
          reject(new CustomError(data.msg, response.status));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addMusicToPlaylist(playlistId, userId, title, artist, album, albumCover, preview, link) {
  return new Promise((resolve, reject) => {
    fetch(`${server}/musics/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playlistId, userId, title, artist, album, albumCover, preview, link,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        reject(new CustomError(error.msg, error.status));
      });
  });
}

function addPlaylist(name, publicFlag, userId) {
  alert(`A new playlist named [${name}] is born and she is ${publicFlag} with this userId : ${userId}`);
  return new Promise((resolve, reject) => {
    fetch(`${server}/playlists/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, publicFlag, userId,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          resolve(data);
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        reject(new CustomError(error.msg, error.status));
      });
  });
}

export {
  login,
  addUser,
  sendEmailToken,
  sendPasswordToken,
  updatePassword,
  getPlaylists,
  getMusicsByVoteInPlaylist,
  getPlaylistById,
  getUserById,
  voteMusic,
  addMusicToPlaylist,
  addPlaylist,
};
