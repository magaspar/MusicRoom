import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Loading from '../screens/Loading';

const mapStateToProps = state => ({
  loggedUser: state.authReducer.loggedUser,
  socket: state.playerReducer.socket,
});

const mapDispatchToProps = dispatch => ({
  setSocket: payload => dispatch(actions.setSocket(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
