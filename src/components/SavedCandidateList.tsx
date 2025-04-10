
import { useEffect, useState } from 'react';
import SavedCandidates from './SavedCandidate.tsx';
import type { Candidate } from '../interfaces/Candidate.interface.tsx'

const SavedCandidateList = () => {
    const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
    

    useEffect(() => {
        const savedCandidates = localStorage.getItem('savedCandidates');
        let candidates: Candidate[] = [];
        if (typeof savedCandidates === 'string') {
            candidates = JSON.parse(savedCandidates);
        }
        setPotentialCandidates(candidates);
    }, []);
    const removeCandidate = (id: number) => {
        let parsedCandidates: Candidate[] = [];
        const savedCandidates = localStorage.getItem('savedCandidates');
        if (typeof savedCandidates === 'string') {
            parsedCandidates = JSON.parse(savedCandidates);
        }
        parsedCandidates = parsedCandidates.filter(
            (person: Candidate) => person.id !== id
        );
        localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
        setPotentialCandidates(parsedCandidates);
    };
    
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Bio</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {potentialCandidates.map((candidate) => (
                    <SavedCandidates
                        key={candidate.id}
                        candidate={candidate}
                        removeCandidate={removeCandidate}
                    />
                ))}
            </tbody>
        </table>
    )
    };

    export default SavedCandidateList;
