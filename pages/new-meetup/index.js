import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupForm(data) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const dataRes = await response.json();
    console.log(dataRes);
    router.push("/");
  }
  return <NewMeetupForm onAddMeetup={addMeetupForm}></NewMeetupForm>;
}
export default NewMeetupPage;
