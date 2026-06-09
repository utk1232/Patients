import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [visitor, setVisitor] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    document.title = 'Dashboard - Qkonnect';
  }, []);

  useEffect(() => {
    fetchDoctor();
    fetchPatients();
    fetchVisitor();
  }, []);


  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const fetchDoctor = async () => {
    try {
      const res = await axios.get("http://localhost:7777/doctorData", {
        withCredentials: true
      })
      setDoctor(res.data);
    }
    catch (error: any) {
      console.error('Failed to fetch:', error);
    }
  }


  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:7777/patientData", {
        withCredentials: true
      })
      setPatients(res.data);
    }
    catch (error: any) {
      console.error('Failed to fetch:', error);
    }
  }

  const handleData = async () => {
    try {
      const res = await axios.post("http://localhost:7777/visitor", {
        firstName: name,
        doctor: selectedDoctor,
        dob,
        contact,
        emailId: email,
        note: notes,
        date: dateTime
      }, { withCredentials: true });
      console.log(res.data);

      setName('');
      setSelectedDoctor('');
      setDateTime('');
      setNotes('');
      setDob('');
      setContact('');
      setEmail('');

      document.getElementById('my_modal_2')?.close();
      fetchPatients();
      fetchVisitor();
      setToastMessage('New Visit Added');
      setToastType('success');
      setShowToast(true);
    } catch (error: any) {
      console.error('Failed to submit:', error);
    }
  };

  const fetchVisitor = async () => {
    try {
      const res = await axios.get("http://localhost:7777/visitorData", {
        withCredentials: true
      })
      console.log(res.data);
      setVisitor(res.data);
    }
    catch (error: any) {
      console.error('Failed to fetch:', error);
    }
  }
const handleDelete = async (visitorId: string) => {
  try {
    await axios.delete(`http://localhost:7777/visitorDelete/${visitorId}`, {
      withCredentials: true
    })
    setToastMessage('Visit Deleted');
    setToastType('info');
    setShowToast(true);
    fetchVisitor();
  } catch (err) {
    console.error('Failed to delete:', err);
    setToastMessage('Failed to delete');
    setToastType('error');
    setShowToast(true);
  }
}
  return (
    <>
      <div className='flex justify-between'>
        <div><h1 className="text-2xl">Dashboard</h1>
          <p>Track and manage all patient visits</p></div>
        <button className="btn text-end" onClick={() => document.getElementById('my_modal_2').showModal()}>New Visit</button></div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-100">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">Record New Visit</legend>
            <label className="label">Patients Name </label>
            <input type="text" value={name} onChange={(e) => (setName(e.target.value))} className="input" placeholder="Patients Name" />
            <label className="label">Doctor</label>
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="select">
              <option value="" disabled>Select a doctor</option>
              {doctor.map((doc: any) => (
                <option key={doc.emailId} value={doc.firstName}>{doc.firstName}</option>
              ))}
            </select>

            <label className="label">DOB</label>
            <input type="date" value={dob} onChange={(e) => (setDob(e.target.value))} className="input" placeholder="dob" />

            <label className="label">Contact</label>
            <input type="text" value={contact} onChange={(e) => (setContact(e.target.value))} className="input" placeholder="contact" />


            <label className="label">Email</label>
            <input type="email" value={email} onChange={(e) => (setEmail(e.target.value))} className="input" placeholder="email" />

            <label className="label">Date & Time</label>
            <input type="datetime-local" value={dateTime} onChange={(e) => (setDateTime(e.target.value))} className="input" placeholder="datetime" />


            <label className="label">Notes</label>
            <input type="text" value={notes} onChange={(e) => (setNotes(e.target.value))} className="input" placeholder="Notes" />

            <button className="btn btn-neutral mt-4" onClick={handleData}>Submit</button>
          </fieldset>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="flex justify-between">
        <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">

          {/* content */}
          <div className="card w-90 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
            <div className="card-body">
              <div className="flex justify-between mb-10">
                <div className="font-bold">Total Visits</div>
                <div className="text-5xl opacity-10">❁</div>
              </div>
              <div className="text-lg mb-4 opacity-40">{visitor.length}</div>

            </div>
          </div>

          {/* 8 empty divs needed for the 3D effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a>
        <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">

          {/* content */}
          <div className="card w-90 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
            <div className="card-body">
              <div className="flex justify-between mb-10">
                <div className="font-bold">CLINICIANS</div>
                <div className="text-5xl opacity-10">❁</div>
              </div>
              <div className="text-lg mb-4 opacity-40">{doctor.length}</div>

            </div>
          </div>

          {/* 8 empty divs needed for the 3D effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a>
        <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">

          {/* content */}
          <div className="card w-90 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
            <div className="card-body">
              <div className="flex justify-between mb-10">
                <div className="font-bold">PATIENTS</div>
                <div className="text-5xl opacity-10">❁</div>
              </div>
              <div className="text-lg mb-4 opacity-40">{patient.length}</div>

            </div>
          </div>

          {/* 8 empty divs needed for the 3D effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Patients</th>
              <th>Clinicians</th>
              <th>Email</th>
              <th>Notes</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {visitor.map((visit: any, index: number) => (
              <tr key={index}>
                <th >{index + 1}</th>
                <td>{visit.firstName}</td>
                <td>{visit.doctor}</td>
                <td>{visit.emailId}</td>
                <td>{visit.note}</td>
                <td>{visit.date}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleDelete(visit.emailId)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showToast && (
        <div className="toast">
          <div className={`alert alert-${toastType}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
