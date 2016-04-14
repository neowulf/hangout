var Avatar = React.createClass({
    getInitialState: function () {
        return {secondsElapsed: 0};
    },
    tick: function () {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },
    componentDidMount: function () {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    render: function () {
        if (this.props.myself === true) {
            return (
                <div>Self
                    <video id={"box" + this.props.avatarid} class="transit boxCommon thumbCommon easyrtcMirror"
                           muted="muted" volume="0"></video>
                    <div>BPM: {this.state.secondsElapsed}</div>
                </div>
            )
        } else {
            return (
                <div>Friend-{this.props.avatarid}
                    <video id={"box" + this.props.avatarid} class="transit boxCommon thumbCommon"
                           ></video>
                    <div>BPM: {this.state.secondsElapsed}</div>
                </div>
            )
        }
    }
});

var HangoutRoom = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    render: function () {
        var avatarNodes = this.props.data.map(function (avatar) {
            return (
                <Avatar avatarid={avatar.id} myself={avatar.myself}/>
            )
        });

        return (
            <div classname="well">
                {avatarNodes}
            </div>
        )
    }
});

React.render(<HangoutRoom data={[{id: 1, myself:true},
{id: 2, myself:false},
{id: 3, myself:false},
{id: 4, myself:false}]}/>, document.getElementById('content'));
