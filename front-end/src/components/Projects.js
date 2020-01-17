import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Projects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/projects/')
            .then(res => {
                setProjects(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [projects]);

    // console.log(users[0]);

    // const handleDelete = e => {

    // }

    return (
        <div>
            {projects.map(project => (
                <div key={project.id} className="project">
                    <p>Project id: <br /><br />{project.id}</p>
                    <p>Project name: <br /><br />{project.name}</p>
                    <p>Project description: <br /><br /> {project.description}</p>
                    {/* <button>Edit</button> */}
                    <button onClick={(() => {
                        // e.preventDefault();
                        axios.delete(`http://localhost:4000/api/projects/${project.id}`)
                    })}>Delete</button>
                </div>
            ))}
        </div>
    );

};

export default Projects;
