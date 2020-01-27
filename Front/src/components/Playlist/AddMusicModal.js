import React from 'react';
import {
  Modal,
} from 'react-native';
import SearchTrack from '../SearchTrack/SearchTrack';


export default class AddMusicModal extends React.Component {
  render() {
    const {
      setModalVisible, modalVisible, playlistId, userId, updateTracks, roomType,
    } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible();
          // Alert.alert('Modal has been closed.');
        }}
      >
        <SearchTrack
          playlistId={playlistId}
          setModalVisible={setModalVisible}
          userId={userId}
          updateTracks={updateTracks}
          roomType={roomType}
        />
      </Modal>
    );
  }
}
