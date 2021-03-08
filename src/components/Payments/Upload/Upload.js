import React, { Component } from "react";
import Dropzone from "../Dropzone/Dropzone";
import "./Upload.css";
import Progress from "../Progress/Progress";
import {Button} from '@material-ui/core'
import {API} from 'aws-amplify'
import axios from 'axios'
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    // this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: files
    }));
  }

  async uploadFiles() {
    if(this.state.files===null){
      alert('Please Select a file.')
      return
    }
    this.setState({ uploadProgress: {}, uploading: true });
    //setLoading(true);
    var docLink;
    const metaData = {
      contentType: this.state.files.type,
    };
    const payload = {
      body: {
        contentType: this.state.files.type,
        metaData: metaData,
      },
    };
    var ext = this.state.files.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "customer",
      payload
    )
      .then((initiateResult) => {
        docLink = `uploads/kycdocuments/customer/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, this.state.files, {
            headers: {
              "Content-Type": this.state.files.type,
            },
          })
          .then((resp) => {


            var paymentModeDetails = null;
            if(this.props.paymentOption==='fullPayment'){
              paymentModeDetails={
                chequeLink:docLink
              }
            }
            else if(this.props.paymentOption==='partialPayment'){
              paymentModeDetails={
                paymentRatio:this.props.paymentRatio,
                chequeLink:docLink
              }
            }
            else if(this.props.paymentOption==='CreditBased'){
              paymentModeDetails={
                paymentDelay:this.props.paymentRatio,
                chequeLink:docLink
              }
            }
            else if(this.props.paymentOption==='Subscription'){
              paymentModeDetails={
                paymentCycle:this.props.paymentRatio,
                chequeLink:docLink
              }
            }
                const payload = {
                  body: {
                    paymentMode:this.props.paymentMode,
                    paymentOption:this.props.paymentOption,
                    orderId:this.props.orderId,
                    paymentModeDetails:paymentModeDetails
                  },
                };
                API.post(
                  "GoFlexeOrderPlacement", `/customer-payments`, payload
                )
                  .then((resp) => {
                    console.log(resp);
                    this.props.setData({
                      paymentId:resp.new.paymentId,
                      paymentMode:resp.new.paymentMode,
                      paymentOption:resp.new.paymentOption ===undefined ? null :resp.new.paymentOption,
                      totalAmount:resp.new.totalAmount
                    });
                    //fun();
                  })
                  .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    //setLoading(false);
   

      this.setState({ successfullUploaded: true, uploading: false });
   
      // Not Production ready! Do some error handling here instead...
      //this.setState({ successfullUploaded: true, uploading: false });
    
  }

  // sendRequest(file) {
  //   return new Promise((resolve, reject) => {
  //     const req = new XMLHttpRequest();

  //     req.upload.addEventListener("progress", event => {
  //       if (event.lengthComputable) {
  //         const copy = { ...this.state.uploadProgress };
  //         copy[file.name] = {
  //           state: "pending",
  //           percentage: (event.loaded / event.total) * 100
  //         };
  //         this.setState({ uploadProgress: copy });
  //       }
  //     });

  //     req.upload.addEventListener("load", event => {
  //       const copy = { ...this.state.uploadProgress };
  //       copy[file.name] = { state: "done", percentage: 100 };
  //       this.setState({ uploadProgress: copy });
  //       resolve(req.response);
  //     });

  //     req.upload.addEventListener("error", event => {
  //       const copy = { ...this.state.uploadProgress };
  //       copy[file.name] = { state: "error", percentage: 0 };
  //       this.setState({ uploadProgress: copy });
  //       reject(req.response);
  //     });

  //     const formData = new FormData();
  //     formData.append("file", file, file.name);

  //     req.open("POST", "http://localhost:8000/upload");
  //     req.send(formData);
  //   });
  // }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
            
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <Button
        variant='contained'
          style={{backgroundColor:'#FF8C00',marginRight:10}}
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </Button>
      );
    } else {
      return (
        <Button
          variant='contained'
          style={{backgroundColor:'#FF8C00',marginRight:10}}
          disabled={this.state.files===null || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload a picture of the payment proof</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            
               {this.state.files!==null && <div key={this.state.files.name} className="Row">
                  <span className="Filename">{this.state.files.name}</span>
                  {this.renderProgress(this.state.files)}
                </div>
              }
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;