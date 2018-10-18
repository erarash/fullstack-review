import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>name</td>
          <td>description</td>
          <td>html_url</td>
        </tr>
      </thead>
      <tbody>
        {props.repos.map(function (repo, key) {
          return (<tr key={repo._id}>
            <td>{repo.id}</td>
            <td>{repo.name}</td>
            <td>{repo.description}</td>
            <td>{repo.html_url}</td>

          </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)


export default RepoList;