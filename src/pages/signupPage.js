import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatRoomIcon from '../images/chat.png';
//import axios from 'axios';
import { Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 10px auto',
        height: 200,
        width: 200
    },
    pageTitle: {
        margin: '10px auto 10px auto',
        color: '#005f56'
    },
    textField: {
        margin: '5px auto 10px auto',
        width: 200
    },
    button: {
        marginTop: 20,
        postion: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    inputError: {
        color: 'red',
        fontSize: '0.7rem',
        marginTop: 10
    },
    linkText: {
        color: '#005f56',
    }
};

class signupPage extends Component {
state = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    errors: {}
};

componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
        this.setState({ errors: nextProps.UI.errors });
    }
}

handleSubmit = (event) => {
event.preventDefault();
// this.setState({ loading: true });
const newUserData = {
    email: this.state.email,
    password: this.state.password,
    confirmPassword: this.state.confirmPassword,
    handle: this.state.handle
}
this.props.signupUser(newUserData, this.props.history)
};

handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
}
    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm={4} xs={12}>
                    <img src={ChatRoomIcon} alt="chatRoomLogo" className={classes.image} />
                    <Typography variant="body1">
                        A place you can be you, uninterrupted 
                    </Typography>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Create An Account
                    </Typography>
                    
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email"
                        className={classes.textField} value={this.state.email} onChange={this.handleChange}
                         helperText={errors.email}
                        error={errors.email ? true : false} /><br />
                        
                        <TextField id="password" name="password" type="password" 
                        label="Password"
                        className={classes.textField} value={this.state.password} 
                        onChange={this.handleChange}
                         helperText={errors.password}
                        error={errors.password ? true : false} /><br />

                        <TextField id="confirmPassword" name="confirmPassword" type="password" 
                        label="Confirm Password"
                        className={classes.textField} value={this.state.confirmPassword} 
                        onChange={this.handleChange}
                         helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false} /><br />
 
                        <TextField id="handle" name="handle" type="text" 
                        label="Choose an Handle"
                        className={classes.textField} value={this.state.handle} 
                        onChange={this.handleChange}
                         helperText={errors.handle}
                        error={errors.handle ? true : false} /><br />

                            {errors.general && (
                                <Typography variant="body2" className={classes.inputError}>
                                {errors.general}
                                </Typography>
                            )}

                        <Button type="submit" variant="contained" 
                        color="primary" className={classes.button} disabled={loading}>
                            Create{loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button> <br /><br />
                        <small>Already have an account? <Link to="/login" className={classes.linkText}>Login</Link></small> 
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
signupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signupPage));