import { useEffect, useState } from 'react'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const patientsDetails = () => {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        fetchPatients()
    }, []);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

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

    const handleDelete = async (emailId: string) => {
        try {
            await axios.delete(`http://localhost:7777/patientDetail/${emailId}`, {
                withCredentials: true
            })
            fetchPatients()
        }
        catch (error: any) {
            console.error('Failed to delete:', error);
        }
    }

    const handleData = async () => {
        try {
            const res = await axios.post("http://localhost:7777/patientDetail", {
                firstName: name,
                contact: contact,
                emailId: email,
                dob: dob,
            }, { withCredentials: true });

            console.log('Login successful:', res.data);
            setError('');
            setShowToast(true);

            document.getElementById('my_modal_2').close();
            // navigate('/dashboard')
            fetchPatients()
        }
        catch (error: any) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || 'Login failed');
        }

    }
    return (
        <>
            <div className='flex justify-between'>
                <div><h1 className="text-2xl">Visits</h1>
                    <p>Track and manage all patient visits</p></div>
                <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>+ New Patient</button></div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-100">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">

                        <label className="label">Full Name </label>
                        <input type="text" value={name} onChange={(e) => (setName(e.target.value))} className="input" placeholder="Full Name" />

                        <label className="label">DOB</label>
                        <input type="date" value={dob} onChange={(e) => (setDob(e.target.value))} className="input" placeholder="dob" />

                        <label className="label">Contact</label>
                        <input type="text" value={contact} onChange={(e) => (setContact(e.target.value))} className="input" placeholder="contact" />


                        <label className="label">Email</label>
                        <input type="email" value={email} onChange={(e) => (setEmail(e.target.value))} className="input" placeholder="email" />

                        <button className="btn btn-neutral mt-4" onClick={handleData}>Login</button>
                        {error && <div className="alert alert-error mt-4"><span>{error}</span></div>}
                    </fieldset>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {showToast && (
                <div className="toast">
                    <div className="alert alert-success">
                        <span>New Patient Added.</span>
                    </div>
                </div>
            )}
            {/* Display patient details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {patients.map((patient: any) => (
                    <div key={patient._id} className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <div className='flex justify-between w-full'>
                                <h2 className="card-title">{patient.firstName}</h2>
                                <p className='text-end cursor-pointer' onClick={() => handleDelete(patient.emailId)}>Close</p>
                            </div>
                            <p><strong>Email:</strong> {patient.emailId}</p>
                            <p><strong>Contact:</strong> {patient.contact}</p>
                            <p><strong>DOB:</strong> {patient.dob}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 
            <div className="flex justify-between">

                {patients.map((patient: any) => (


                    <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">

                  
                        <div key={patient._id} className="card w-90 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
                            <div className="card-body">
                                <div className="flex justify-between mb-10">
                                    {/* <div className="font-bold">Total Visits</div>
                                    <div className="text-5xl opacity-10">❁</div> 
                                      <div className="font-bold">{patient.firstName}</div>
                            <p><strong>Email:</strong> {patient.emailId}</p>
                            <p><strong>Contact:</strong> {patient.contact}</p>
                            <p><strong>DOB:</strong> {patient.dob}</p>
                                </div>
                                <div className="text-lg mb-4 opacity-40">0210 8820 1150 0222</div>

                            </div>
                        </div>

                  
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </a>
                ))}
            </div> */}
        </>
    )
}

export default patientsDetails
