import SelectButton from './components/SelectButton';

function App() {
  return (
    <>
      <ul id="exhibit-options-list">
        {/* First set of buttons, further apart */}
        <div id="exhibit-options-outer">
          <li>
            <SelectButton name="Ancient Greece" />
          </li>
          <li>
            <SelectButton name="Ancient Rome" />
          </li>
        </div>

        {/* Second set of buttons, closer together */}
        <div id="exhibit-options-inner">
          <li>
            <SelectButton name="Ancient Egypt" />
          </li>
          <li>
            <SelectButton name="Persian Empire" />
          </li>
        </div>
      </ul>
    </>
  );
}

export default App;
