import React, { useState } from 'react';
import AdminNavbar1 from "../components/UI/AdminNavbar";
import '../components/CSS/AdminAnnouncementForm.css';
import { useSendMailsMutation } from '../Slices/adminApiSlice';
import Loader from '../components/Loader/Loader'
function AdminAnnouncementForm() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sendMail, { isLoading }] = useSendMailsMutation();

     const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;


    if (isValid) {
      try {
        const res = await sendMail({ subject, message }).unwrap();
        console.log(res);
        setSubject("");
        setMessage("");
      } catch (error) {
       console.error(error.message);
      }
      setSubject("");
      setMessage("");
    }
  };

  if (isLoading) return <Loader />;
    return (
        <div>
        <AdminNavbar1 />
        <div className="admin-announcement-container">
        <div className="admin-announcement-form">
            <h1 className="form-title">Announcements</h1>
            <br /><br />
            <form className="announcement-form" onSubmit={handleSubmit}>
                <label htmlFor="subject" className="form-label">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                /><br />

                <label htmlFor="message" className="form-label">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                ></textarea><br />

                <button className="form-button" type="submit">Send Announcement</button>
            </form>
        </div>
        </div>
        </div>
       
    );
   
}

export default AdminAnnouncementForm;
