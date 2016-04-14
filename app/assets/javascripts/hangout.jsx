var AvatarBpm = React.createClass({
    getInitialState: function () {
        return {bpm: -2};
    },
    render: function () {
        if (this.props.avatarid == this.props.avatar_bpms.avatar_id) {
            this.state.bpm = this.props.avatar_bpms.avatar_bpm;
        }
        return (
            <div>BPM: {this.state.bpm} </div>
        )
    }
});

var Avatar = React.createClass({
    getInitialState: function () {
        return {secondsElapsed: 0};
    },
    tick: function () {
        try {
            this.state.secondsElapsed = this.state.secondsElapsed + 1;
            var stringToSend = this.props.avatarid + "-" + (this.state.secondsElapsed + 1);
            for (var i = 0; i < maxCALLERS; i++) {
                var easyrtcid = easyrtc.getIthCaller(i);
                if (easyrtcid && easyrtcid != "") {
                    easyrtc.sendPeerMessage(easyrtcid, "bpm", stringToSend);
                }
            }
        } catch (e) {
            //do nothing
        }
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
                </div>
            )
        } else {
            return (
                <div>Friend-{this.props.avatarid}
                    <video id={"box" + this.props.avatarid} class="transit boxCommon thumbCommon"
                    ></video>
                </div>
            )
        }
    }
});

var maxCALLERS = 3;
var numVideoOBJS = maxCALLERS + 1;

var HangoutRoom = React.createClass({
        loginSuccess: function () {
            console.info("Log in success");
        },
        callEverybodyElse: function (roomName, otherPeople) {

            easyrtc.setRoomOccupantListener(null); // so we're only called once.

            var list = [];
            var connectCount = 0;
            for (var easyrtcid in otherPeople) {
                list.push(easyrtcid);
            }
            //
            // Connect in reverse order. Latter arriving people are more likely to have
            // empty slots.
            //
            function establishConnection(position) {
                function callSuccess() {
                    connectCount++;
                    if (connectCount < maxCALLERS && position > 0) {
                        establishConnection(position - 1);
                    }
                }

                function callFailure(errorCode, errorText) {
                    easyrtc.showError(errorCode, errorText);
                    if (connectCount < maxCALLERS && position > 0) {
                        establishConnection(position - 1);
                    }
                }

                easyrtc.call(list[position], callSuccess, callFailure);
            }

            if (list.length > 0) {
                establishConnection(list.length - 1);
            }
        },
        getInitialState: function () {
            return {avatar_bpms: {avatar_id: -1, avatar_bpm: -1}};
        },
        messageListener: function (easyrtcid, msgType, content, targeting) {
            console.log("From " + easyrtc.idToName(easyrtcid) +
                " sent the following data " + content);
            var _avatar_id = content.split('-')[0];
            var _avatar_bpm = content.split('-')[1];
            
            this.setState({avatar_bpms: {"avatar_id": _avatar_id, "avatar_bpm": _avatar_bpm}});
        },
        componentDidMount: function () {

            easyrtc.setRoomOccupantListener(this.callEverybodyElse);
            easyrtc.setSocketUrl("192.168.1.82:8080");
            easyrtc.easyApp("easyrtc.multiparty", "box0", ["box1", "box2", "box3"], this.loginSuccess);

            easyrtc.setPeerListener(this.messageListener);
        }
        ,
        render: function () {
            var that = this;
            var avatarNodes = this.props.data.map(function (avatar) {
                return (
                    <div>
                        <Avatar avatarid={avatar.id} myself={avatar.myself}/>
                        <AvatarBpm avatarid={avatar.id} avatar_bpms={that.state.avatar_bpms}/>
                    </div>
                )
            });

            return (
                <div classname="well">
                    {avatarNodes}
                </div>
            )
        }
    })
    ;

React.render(<HangoutRoom data={[{id: 0, myself:true},
{id: 1, myself:false},
{id: 2, myself:false},
{id: 3, myself:false}]}/>, document.getElementById('content'));
