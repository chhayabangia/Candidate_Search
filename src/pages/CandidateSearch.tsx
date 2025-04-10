import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface.tsx'
import CandidateCard from '../components/CandidateCard.tsx';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>({
    login: null,
    id: null,
    avatar_url: null,
    html_url: null,
    name: null,
    location: null,
    email: null,
    company: null,
    bio: null
  })
  
  const [currentCandidateId, setCurrentCandidateId] = useState<number>(0);

  const searchSpecificCandidate = async (user: string) => {
    const data: Candidate = await searchGithubUser(user);

    setSelectedCandidate(data);
  }

  const searchCandidates = async () => {
    const data: Candidate[] = await searchGithub();

    setCandidates(data);

    await searchSpecificCandidate(data[currentCandidateId].login || '');
  }

  const candidateDetermination = async (candidateIsChoosen: boolean) => {
    if (candidateIsChoosen) {
      let parsedCandidates: Candidate[] = [];
      const savedCandidates = localStorage.getItem('savedCandidates')
      if (typeof savedCandidates === 'string') {
      parsedCandidates = JSON.parse(savedCandidates);
    }
    parsedCandidates.push(selectedCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
  };
  if (currentCandidateId + 1 < candidates.length) {
    setCurrentCandidateId(currentCandidateId + 1);
    await searchSpecificCandidate(candidates[currentCandidateId + 1].login || '')
  } else {
    setCurrentCandidateId(0);
    await searchCandidates();
  }
};

useEffect(() => {
  searchCandidates();
  searchSpecificCandidate(selectedCandidate.login || '');
}, []);
  
  return (
    <>    
      <h1>Candidate Search</h1>
      <CandidateCard currentCandidate={selectedCandidate} candidateDetermination={candidateDetermination} />
    </>
  );
};

export default CandidateSearch;
