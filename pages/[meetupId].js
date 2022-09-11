import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { url } from "../config";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetups.image}
      title={props.meetups.title}
      address={props.meetups.address}
      description={props.meetups.description}
    ></MeetupDetail>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://[user]:[passwd]@cluster0.3qtkkuv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsMongo = await meetupsCollection
    .find(
      {},
      {
        _id: 1,
      }
    )
    .toArray();
  client.close();
  return {
    fallback: false,
    paths: meetupsMongo.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(url);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();
  return {
    props: {
      meetups: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
    revalidate: 10,
  };
}
export default MeetupDetails;
