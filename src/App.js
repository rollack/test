   import React, { useState } from 'react';
   import axios from 'axios';

   function App() {
     const [domain, setDomain] = useState('');
     const [contentType, setContentType] = useState('');
     const [criteria, setCriteria] = useState('');

     const handleSubmit = async (event) => {
       event.preventDefault();
       const response = await axios.post('/scrape', { domain, contentType, criteria });
       console.log(response.data);
     };

     return (
       <div className="App">
         <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Domain" value={domain} onChange={e => setDomain(e.target.value)} />
           <select value={contentType} onChange={e => setContentType(e.target.value)}>
             <option value="">Select content type</option>
             <option value="text">Text</option>
             <option value="images">Images</option>
             <option value="video">Video</option>
             <option value="audio">Audio</option>
           </select>
           <input type="text" placeholder="Criteria" value={criteria} onChange={e => setCriteria(e.target.value)} />
           <button type="submit">Scrape</button>
         </form>
       </div>
     );
   }

   export default App;