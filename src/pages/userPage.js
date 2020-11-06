import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/Post/Post';
import StaticProfile from '../components/userProfile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import PostSkeleton from '../utility/PostSkeleton';
import UserProfileSkeleton from '../utility/UserProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class User extends Component {
  state = {
    profile: null,
    postIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { chatRoomPosts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const chatRoomPostsMarkup = loading ? (
      <PostSkeleton />
    ) : chatRoomPosts === null ? (
      <p>No Posts from this user</p>
    ) : !postIdParam ? (
      chatRoomPosts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      chatRoomPosts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {chatRoomPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <UserProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps,{getUserData})(User);
