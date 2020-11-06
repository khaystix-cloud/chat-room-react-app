import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Post from '../components/Post/Post';
import UserProfile from '../components/userProfile/UserProfile';
import PostSkeleton from '../utility/PostSkeleton';

import { connect } from 'react-redux';
import { getchatRoomPosts } from '../redux/actions/dataActions';

class homePage extends Component {
  componentDidMount() {
    this.props.getchatRoomPosts();
  }
  render() {
    const { chatRoomPosts, loading } = this.props.data;
    let recentChatRoomPostsMarkup = !loading ? (
      chatRoomPosts.map((post) => <Post 
      key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentChatRoomPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <UserProfile />
        </Grid>
      </Grid>
    );
  }
}

homePage.propTypes = {
  getchatRoomPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps,{getchatRoomPosts})(homePage);
