import { connect } from 'react-redux';

import Connexion from '../screens/Connexion';
import * as actions from '../redux/actions';

const mapStateToProps = state => ({
  tmpLogUser: state.authReducer.tmpLogUser,
  socket: state.playerReducer.socket,
});

const mapDispatchToProps = dispatch => ({
  userChanged: payload => dispatch(actions.userChanged(payload)),
  admin: payload => dispatch(actions.admin(payload)),
  setSocket: payload => dispatch(actions.setSocket(payload)),
  logPassLogin: payload => dispatch(actions.logPassLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
