import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const CreatePage = () => {
    const [link, setLink] = useState('');
    const {request} = useHttp();

    const history = useHistory();
    const auth = useContext(AuthContext);
    
    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`,
                });
                history.push(`/detail/${data.link._id}`);
                
            } catch (error) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input 
                        placeholder="Link"
                        id="link" 
                        type="text"
                        name="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Paste link</label>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;