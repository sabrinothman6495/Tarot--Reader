import React from 'react';

const Quote = ({ text }: { text: string }) => (
  <blockquote>
    <p>"{text}"</p>
    <cite>- Ron Swanson</cite>
  </blockquote>
);

export default Quote;
