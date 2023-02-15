import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWork } from 'app/shared/model/work.model';
import { getEntities } from './work.reducer';

export const Work = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const workList = useAppSelector(state => state.work.entities);
  const loading = useAppSelector(state => state.work.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="work-heading" data-cy="WorkHeading">
        Works
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/work/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Work
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workList && workList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Published</th>
                <th>Person</th>
                <th>Institution</th>
                <th>Role Work</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workList.map((work, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/work/${work.id}`} color="link" size="sm">
                      {work.id}
                    </Button>
                  </td>
                  <td>{work.name}</td>
                  <td>{work.published ? <TextFormat type="date" value={work.published} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {work.people
                      ? work.people.map((val, j) => (
                          <span key={j}>
                            <Link to={`/person/${val.id}`}>{val.id}</Link>
                            {j === work.people.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {work.institutions
                      ? work.institutions.map((val, j) => (
                          <span key={j}>
                            <Link to={`/institution/${val.id}`}>{val.id}</Link>
                            {j === work.institutions.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {work.roleWorks
                      ? work.roleWorks.map((val, j) => (
                          <span key={j}>
                            <Link to={`/role-work/${val.id}`}>{val.id}</Link>
                            {j === work.roleWorks.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/work/${work.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/work/${work.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/work/${work.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Works found</div>
        )}
      </div>
    </div>
  );
};

export default Work;
