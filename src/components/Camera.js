import React, { Component } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
export default class CameraFeed extends Component {
  processDevices(devices) {
    devices.forEach((device) => {
      // console.log(device.label);
      this.setDevice(device);
    });
  }

  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId },
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  takePhoto = () => {
    const { sendFile } = this.props;
    const context = this.canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 680, 360);
    this.canvas.toBlob(sendFile);
  };

  render() {
    return (
      <div className='c-camera-feed'>
        {!this.canvas && (
          <>
            <div className='c-camera-feed__viewer'>
              
              {!this.canvas && (
                <video
                  ref={(ref) => (this.videoPlayer = ref)}
                 style={{width:'90%'}}
                />
              )}
            </div>
            <CameraAltIcon onClick={this.takePhoto} fontSize='large' />
          </>
        )}

        <div className='c-camera-feed__stage'>
         <canvas
            width='680'
            height='460'
            style={{ width: "100%", height: "95%", margin: "auto" }}
            ref={(ref) => (this.canvas = ref)}
          />
        </div>
      </div>
    );
  }
}
