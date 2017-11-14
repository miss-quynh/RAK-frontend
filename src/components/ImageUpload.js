import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component {
    constructor() {
      super();
      this.state = {
        imageUrl: ''
      }
      this.updateImage = this.updateImage.bind(this);
    }



  updateImage(event) {
    // this.setState({
    //   imageFile: event.target.files[0]
    // })
    let file = event.target.files[0]
    let data = new FormData()
    data.append("organization[avatar]", file)
    // below should be integrated with new organization form data
    data.append("organization[organization_name]", "new org" + Math.random())
    data.append("organization[tax_code]", 1329857)
    data.append("organization[email]", "someone"+ Math.floor(Math.random() * 1000) + "@email.com")
    data.append("organization[password]", "password")
    data.append("organization[category_id]", 1)
    console.log(data)
    axios.post("http://localhost:8181/organizations", data)
      .then(response => {
        this.setState({
          organization: response.data.organization,
          imageUrl: response.data.image_url
        })
      })
      .catch(error => console.log("Fil upload error: ", error))
  }


  render() {
    return (
      <div>
        <label>Upload Photo</label><br/>
        <input type="file" onChange={this.updateImage}/>
        <img src={"http://localhost:8181" + this.state.imageUrl} />
      </div>
    )
  }
}


export default ImageUpload;
