import SelectButton from './components/SelectButton';

function App() {
  return (
    <>
      <ul className="exhibit-options-list">
        <li>
          <SelectButton name="Ancient Greece" />
        </li>
        <li>
          <SelectButton name="Ancient Rome" />
        </li>
        <li>
          <SelectButton name="Ancient Egypt" />
        </li>
        <li>
          <SelectButton name="Persian Empire" />
        </li>
      </ul>
    </>
  );
}

export default App;
