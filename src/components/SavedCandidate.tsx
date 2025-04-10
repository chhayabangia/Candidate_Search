import type { Candidate } from '../interfaces/Candidate.interface.tsx'
import { IoRemoveCircle } from 'react-icons/io5'

type SavedCandidateListProps = {
    candidate: Candidate;
    removeCandidate: (id: number) => void
};

const SavedCandidates = ({
    candidate,
    removeCandidate,
}: SavedCandidateListProps) => {
    return (
      <tr>
        { candidate ? (
            <>
                <td>
                        <img
                            src={candidate.avatar_url || 'default-avatar.png'}
                            alt={`Profile of ${candidate.login || 'N/A'}`}
                            style={{
                                width: '70px',
                                borderRadius: '10px',
                                display: 'block',
                                margin: '0 auto',
                            }}
                        />
                    </td>
                    <td>
                        <a href={candidate.html_url || '#'} target="_blank" rel="noreferrer">
                            <h3 style={{ color: 'white' }}>
                                {candidate.name || 'N/A'}
                                <br />
                                <em>({candidate.login || 'N/A'})</em>
                            </h3>
                        </a>
                    </td>
                    <td>{candidate.location || 'N/A'}</td>
                    <td>
                        {candidate.email ? (
                            <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                        ) : (
                            'N/A'
                        )}
                    </td>
                    <td>{candidate.company || 'N/A'}</td>
                    <td>{candidate.bio || 'N/A'}</td>
                    <td>
                        <IoRemoveCircle
                            style={{
                                color: 'red',
                                margin: '0 auto',
                                display: 'block',
                                cursor: 'pointer',
                                fontSize: '50px',
                            }}
                            onClick={() => removeCandidate(candidate.id || 0)}
                        />
                    </td>
                </>
            ) : (
                <h2>No candidates have been saved.</h2>
            )}
        </tr>
    );
};

export default SavedCandidates;