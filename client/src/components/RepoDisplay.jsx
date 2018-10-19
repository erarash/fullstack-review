import React from 'react';

const RepoDisplay = ({ repos }) => (
    <div>
    {repos.map((repo, i) => (
        <div key={i}>
        <p>{repo.name}</p>
        <p>{repo.description}</p>
        <p>{repo.html_url}</p>
        </div>
    ))}
    </div>
    );

    export default RepoDisplay;