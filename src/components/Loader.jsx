export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader-wrap">
      <div style={{textAlign:'center'}}>
        <div className="loader" style={{margin:'0 auto 1rem'}}></div>
        <div style={{fontSize:14,color:'var(--color-muted)'}}>{label}</div>
      </div>
    </div>
  );
}
