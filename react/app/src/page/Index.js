import React, { useState, useEffect, Fragment } from "react"
import Header from "../components/Layout/Header"
import SearchSection from "../components/Sections/SearchSection"
import DataSection from "../components/Sections/DataSection"
import Loader from "../components/Layout/Loader";
import { getResult } from "../api/api"
import { Container, Row, Col } from "reactstrap"

export default function Index() {

  // Setting up state hooks
  const [hashtag, setHashtag] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    if(hashtag !== ''){
      try{
        const fetchResult = async (tag) => {
          setLoading(true);
          const res = await getResult(tag);
          setData(res.data);
          setLoading(false);
          setLoaded(true);
        }
        fetchResult(hashtag);
      }catch(err){
        throw err;
      }
    }
  }, [hashtag])

  // show data section if there is data
  const showData = () =>{
    return data ? <DataSection data={data} tag={hashtag} /> : <></>
  }

  return (
    <div>
      <Header />
      <Container className="mt-5">
      <SearchSection setHashtag={setHashtag} />
        {!loading ? (
            loaded ? <DataSection data={data} tag={hashtag} /> : <Fragment></Fragment>
        ):(
          <Loader />
        )}
        {/* {loading ? (<DataSection />) : (<Loader />) }
        {loading && (<Loader />)} */}
      </Container>
    </div>
  );
}
