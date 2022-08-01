import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { url } from "../config";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="WOW!"></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(url);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsMongo = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetupsMongo.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}
export default HomePage;
