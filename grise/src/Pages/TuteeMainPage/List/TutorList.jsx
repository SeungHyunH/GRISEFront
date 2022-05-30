import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import TutorItem from './TutorItem';
import {Link} from 'react-router-dom';

const TutorList = () => {
    const [tutorList,setTutorList] = useState([]);
    const [outputList,setOutputList]=useState([]);
    const [touchPosition,setTouchPosition]= useState({x:0,y:0});
    const ItemRef = useRef();
    const ContainerRef = useRef();
	
    useEffect(() => {
        axios({
            method:'GET',
            url:`http://grise.p-e.kr/tutee/tutors`,
            headers: {
              Authorization: window.localStorage.getItem('token') ,
              "Content-Type": "application/json",
            }
        })
        .then((res) => {
            console.log(res.data);
            setTutorList(res.data);
            let temp = [];
            for(let i=0;i<10;i++){
                if(i > res.data.length-1){break;}
                temp.push(res.data[i]);
            };
            setOutputList(temp);
            
        }).catch((error) => console.log(error));
      }, []);

    const onTouchStart=(e)=>{
        setTouchPosition({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
    }

    const onTouchEnd=(e)=>{
        const distanceY = touchPosition.y - e.changedTouches[0].pageY; //드래그한 Y길이 시작Y좌표 - 드래그끝났을때 Y좌표 내릴때 양수
        const DivHeight = ItemRef.current.style.height; //아이템 하나의 높이
        const scrollY = ContainerRef.current.getBoundingClientRect().bottom-ItemRef.current.getBoundingClientRect().bottom;
        //높이가 소수점이면 애매하게 딱 안맞을 수 있어서 수정
        if(-0.1<scrollY&&scrollY<0.1){
            if(distanceY>DivHeight){//스크롤링위치가 맨마지막에 되어있을때 item하나의 높이보다 더 드래그하면 새로고침
                console.log('새로고침');
                const temp = [...outputList];
                for(let i = outputList.length; i < outputList.length+10; i++){
                    if(i>=tutorList.length){break;}
                    temp.push(tutorList[i]);
                }
                setOutputList(temp);
            }
        }
    }

    const getItem = () =>{
        if(outputList.length === 0){return;}
        const result = [];
        for(let i = 0; i < outputList.length-1; i++){
            result.push(<TutorItem key = {i} isEnd={false} data = {outputList[i]}></TutorItem>);
        }
        result.push(<TutorItem key = {outputList.length-1} isEnd={true} data = {outputList[outputList.length-1]} ref={ItemRef}></TutorItem>);
        return result;
    }

    return ( 
        <>
            <ScrollDiv ref = {ContainerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {getItem()}
            </ScrollDiv>
            <Link to='/RequestConsult' state={{consult:'NormalConsult',tutorId:null}}><RequestButton>일반 피드백 요청하기</RequestButton></Link>
        </>
    )
}

const ScrollDiv = styled.div`
    margin: 0 auto;
    width: 95%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y:auto;
    ::-webkit-scrollbar {
        display: none;
    }
`

const RequestButton = styled.div`
    position: fixed;
    bottom: 3rem;
    left: 50%;
    margin-left: -6rem;
    border-radius: 0.5rem;
    text-align: center;
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: bold;
    color: #fff;
    background-color: #3A6C7B;
    width: 12rem;
    height: 3rem;
    float: left;
    font-size: 1rem;
    line-height: 3rem;
`

export default TutorList;