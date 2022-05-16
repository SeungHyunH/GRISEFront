import React,{useState} from "react";
import styled from 'styled-components';
import NavBar from '../NavBar'

const FeedbackRequestPage = ()=>{
  const [title, setTitle] = useState('');
  const [content,setContent] = useState('');
  const [postfiles, setPostfiles] = useState({
    file: [],
    previewURL: "",
  });
  const [fileName,setFileName] = useState('');

  const uploadFile = (e) => {
    e.stopPropagation();
    let reader = new FileReader();
    let file = e.target.files[0];
    setFileName(e.target.files[0].name);
    const filesInArr = Array.from(e.target.files);
  
    reader.onloadend = () => {
      setPostfiles({
        file: filesInArr,
        previewURL: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const summitConsult = ()=>{
    const consult = {
      "request_consult":{
        "title": title,
        "content": content,
        "tutor":"None",
        "video":postfiles
      }
    }
    console.log(consult);
  }
  return (
    <Wrap>
      <NavBar/>
      <Title>제목</Title>
      <Input 
        type='text'
        placeholder="제목을 입력해 주세요"
        onChange={(e)=>{setTitle(e.target.value)}}
      ></Input>
      <Title>본문</Title>
      <TextArea onChange={(e)=>{setContent(e.target.value)}} />
      <div style={{width:'100%',height:'4.5rem'}}>
        <Title>영상 업로드</Title>
        <div style={{height:'2rem',display:'flex'}}>
          <VideoInput htmlFor="input-file">업로드</VideoInput>
          <input
            id="input-file"
            type="file"
            accept= "video/*"
            name={'filename'}
            style={{display:'none'}}
            onChange={uploadFile}
          />
          <FileName >{fileName}</FileName>
        </div>
      </div>
      
      <SubmmitButton onClick={summitConsult}>피드백 요청</SubmmitButton>
    </Wrap>
  );
}

const SubmmitButton = styled.div`
    position: fixed;
    bottom: 1rem;
    left: 50%;
    margin-left: -6rem;
    border-radius: 0.5rem;
    width: 12rem;
    height: 3rem;
    float: left;
    font-size: 1rem;
    line-height: 3rem;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    color: #fff;
    background-color: #3A6C7B;
`

const FileName = styled.div`
    flex: 2;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0.5rem;
    text-align: center;
    width: 12rem;
    height:2rem;
    border-radius: 0.5rem;
    line-height: 1rem;
`

const VideoInput = styled.label`
    flex: 1;
    margin-left: 0.5rem;
    border-radius: 0.5rem;
    width: 10rem;
    height: 2rem;
    border:solid;
    border-color: black;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    color: #3A6C7B;
    background-color: white;
`

/*
<div>
  <div style={{height:'2.5rem'}}>
    <SpanTitle>지역 선택</SpanTitle>
    <SpanSubTitle>지역을 선택해 주세요</SpanSubTitle>
  </div>
  <div style={{height:'3rem'}}>
    <Select onChange={(e)=>{setLocal(e.target.value)}}>
      {localList.map(e=><option key = {e}>{e}</option>)}
    </Select>
  </div>
</div>
const SpanTitle = styled.span`
    margin-left: 0.5rem;
    float: left;
    width: 6rem;
    padding: 0.5rem;
    padding-right: 0;
    font-size: 1rem;
    text-align:left;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    color: #3A6C7B;
    width: 5rem;
`

const SpanSubTitle = styled.span`
    position: relative;
    top: 1rem;
    float: left;
    font-size: 0.5rem;
    text-align:left;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
`


const Select = styled.select`
    margin-left: 0.5rem;
    border-radius: 0.5rem;
    width: 10rem;
    height: 2rem;
    border:solid;
    border-color: black;
    float: left;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    color: #3A6C7B;
    background-color: white;
`
*/
const TextArea = styled.textarea`
    margin-left: 0.5rem;
    width: 95%;
    size: 100%;
    height: 8rem;
    font-size: 1rem;
    text-align:left;
    border-radius: 0.5rem;
    border:solid;
    border-color: black;
`

const Title = styled.div`
    margin-left: 0.5rem;
    display: block;
    font-size: 1rem;
    text-align:left;
    padding: 0.3rem;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    color: #3A6C7B;
`

const Input = styled.input`
    width: 95%;
    height: 2rem;
    margin-left: 0.5rem;
    size: 100%;
    font-size: 1rem;
    text-align:left;
    border-radius: 0.5rem;
    border:solid;
    border-color: black;
`

const Wrap = styled.div`
  /* background-color: brown; */
  width: 1200px;
  height:100%;
  margin:0 auto;
  

  @media (max-width:1220px){
    width: 100%;
  }

  @media (max-width:768px){
    width: 100%;
  }

  @media (max-width:480px){
    width:100%;
    background-color:white;
  }
`

export default FeedbackRequestPage;