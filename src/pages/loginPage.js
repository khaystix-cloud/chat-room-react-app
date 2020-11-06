import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatRoomIcon from '../images/chat.png';
import { Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
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

class loginPage extends Component {
state = {
    email: '',
    password: '',
    errors: {}
};

componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
        this.setState({ errors: nextProps.UI.errors });
    }
}

handleSubmit = (event) => {
event.preventDefault();
const userData = {
    email: this.state.email,
    password: this.state.password
};
this.props.loginUser(userData, this.props.history);
};

handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
}
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm={4} xs={12}>
                    <img src={ChatRoomIcon} alt="chatRoomLogo" className={classes.image} />
                    <Typography variant="body1">
                        Hi, Welcome to Khaystix's Chat-Room
                    </Typography>
                    <Typography variant="h3" className={classes.pageTitle}>
                        login
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

                            {errors.general && (
                                <Typography variant="body2" className={classes.inputError}>
                                {errors.general}
                                </Typography>
                            )}

                        <Button type="submit" variant="contained" 
                        color="primary" className={classes.button} disabled={loading}>
                            login{loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button> <br /><br />
                        <small>Don't have an account? <Link to="/signup" className={classes.linkText}>Create a new account</Link></small> 
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
loginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(loginPage));