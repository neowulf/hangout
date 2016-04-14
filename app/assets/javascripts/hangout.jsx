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

var maxCALLERS = 3;
var numVideoOBJS = maxCALLERS+1;

var HangoutRoom = React.createClass({
    loginSuccess: function() {
        console.info("Log in success");
    },
    callEverybodyElse: function(roomName, otherPeople) {

        easyrtc.setRoomOccupantListener(null); // so we're only called once.

        var list = [];
        var connectCount = 0;
        for(var easyrtcid in otherPeople ) {
            list.push(easyrtcid);
        }
        //
        // Connect in reverse order. Latter arriving people are more likely to have
        // empty slots.
        //
        function establishConnection(position) {
            function callSuccess() {
                connectCount++;
                if( connectCount < maxCALLERS && position > 0) {
                    establishConnection(position-1);
                }
            }
            function callFailure(errorCode, errorText) {
                easyrtc.showError(errorCode, errorText);
                if( connectCount < maxCALLERS && position > 0) {
                    establishConnection(position-1);
                }
            }
            easyrtc.call(list[position], callSuccess, callFailure);

        }
        if( list.length > 0) {
            establishConnection(list.length-1);
        }
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {

        easyrtc.setRoomOccupantListener(this.callEverybodyElse);
        easyrtc.setSocketUrl("192.168.1.6:8080");
        easyrtc.easyApp("easyrtc.multiparty", "box0", ["box1", "box2", "box3"], this.loginSuccess);
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

React.render(<HangoutRoom data={[{id: 0, myself:true},
{id: 1, myself:false},
{id: 2, myself:false},
{id: 3, myself:false}]}/>, document.getElementById('content'));
