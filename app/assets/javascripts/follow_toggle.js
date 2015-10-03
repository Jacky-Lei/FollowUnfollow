$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.attr('data-user-id');
  this.initialFollowState = this.$el.attr('data-initial-follow-state');
  this.render();
  this.handleClick();
};

$.FollowToggle.prototype.render = function () {
  this.$el.prop("disabled", false);
  if (this.initialFollowState === "followed") {
    this.$el.text("Unfollow");
  } else if  (this.initialFollowState === "unfollowed"){
    this.$el.text("Follow");
  } else if(this.initialFollowState === "following" ||
          this.initialFollowState === "unfollowing" ){
    this.$el.prop("disabled", true);
  }
};

$.FollowToggle.prototype.handleClick = function () {
  var that = this;
  that.$el.on('click', function (e) {
    e.preventDefault();
    if (that.initialFollowState === "unfollowed"){
      that.initialFollowState = "following";
      that.render();
      $.ajax({
        url: "/users/" + that.userId + "/follow",
        type: "POST",
        dataType: 'json',
        success: function () {
          that.initialFollowState = "followed";
          that.render();
        }
      });
    } else {
        that.initialFollowState = "unfollowing";
        that.render();
      $.ajax({
        url: "/users/" + that.userId + "/follow",
        type: "DELETE",
        dataType: 'json',
        success: function () {
          that.initialFollowState = "unfollowed";
          that.render();
        }
      });
    }
  });
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
