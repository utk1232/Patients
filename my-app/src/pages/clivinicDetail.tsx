import { useEffect, useState } from 'react'
import axios from 'axios';

const ClivinicDetail = () => {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [specalist, setSpecalist] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(true);
    // // const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Clinicians - Qkonnect';
        fetchPatients()
    }, []);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const fetchPatients = async () => {
        try {
            const res = await axios.get("http://localhost:7777/doctorData", {
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
            console.log('Delete doctor with email:', emailId);
            await axios.delete(`http://localhost:7777/doctorDetails/${emailId}`, {
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
            const res = await axios.post("http://localhost:7777/doctorDetail", {
                firstName: name,
                emailId: emailId,
                specalist: specalist
            }, { withCredentials: true });

            console.log('Doctor data submitted successfully:', res.data);
            setError('');
            setShowToast(true);
            // Clear form
            setName('');
            setEmailId('');
            setSpecalist('');

            document.getElementById('my_modal_2').close();
            fetchPatients()
        }
        catch (error: any) {
            console.error('Failed to submit doctor data:', error);
            setError(error.response?.data?.message || 'Failed to submit doctor data');
        }  
    }

    return (
        <>
            <div className='flex justify-between'>
                <div><h1 className="text-2xl">Doctors Records</h1>
                    <p>Track and manage all doctor details</p></div>
                <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>+ New Doctor</button></div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-100">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">

                        <label className="label">Full Name </label>
                        <input type="text" value={name} onChange={(e) => (setName(e.target.value))} className="input" placeholder="Full Name" />

                        <label className="label" htmlFor="cars">Choose a specalist:</label>
                        <select value={specalist} name="cars" id="cars" onChange={(e) => setSpecalist(e.target.value)}>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>

                        <label className="label">Email</label>
                        <input type="email" value={emailId} onChange={(e) => (setEmailId(e.target.value))} className="input" placeholder="email" />

                        <button className="btn btn-neutral mt-4" onClick={handleData} >Add Clivician</button>
                        {error && <div className="alert alert-error mt-4"><span>{error}</span></div>}
                    </fieldset>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Display doctor details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {patients.map((patient: any) => (
                    <div key={patient._id} className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <div className='flex justify-between w-full'>
                                <h2 className="card-title">{patient.firstName}</h2>
                                <p className='text-end cursor-pointer' onClick={() => handleDelete(patient.emailId)}>Close</p>
                            </div>
                            <p><strong>Email:</strong> {patient.emailId}</p>
                            <p><strong>Specialist:</strong> {patient.specalist}</p>

                        </div>
                    </div>
                ))}
            </div>
            {showToast && (
                <div className="toast">
                    <div className="alert alert-success">
                        <span>New Doctor Added.</span>
                    </div>
                </div>
            )}

        </>
    )
}

export default ClivinicDetail
