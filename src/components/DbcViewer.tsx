import { Dbc } from 'candied';
import { DbcData } from 'candied/lib/dbc/Dbc';
import { dbcReader } from 'candied/lib/filesystem/DbcWebFs';
import { useEffect, useState } from 'react';

import fomeDbcFileRaw from '!!raw-loader!../data/FOME_CAN_verbose.dbc';

const DbcViewer = () => {
  const [dbcData, setDbcData] = useState<DbcData>(null);

  useEffect(() => {
    const dbc = new Dbc();

    dbcReader(new File([fomeDbcFileRaw], 'file.dbc'), (content) => {
      const data = dbc.load(content);
      setDbcData(data);
    });
  }, []);

  if (!dbcData) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      {Array.from(dbcData.messages.values())
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((message) => (
          <div key={message.id}>
            <h3 id={`#${message.name}`}>Message {message.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CAN ID</th>
                  <th>DLC</th>
                  <th>Sending Node</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{message.name}</td>
                  <td>
                    {message.id} ({`0x${message.id.toString(16)}`})
                  </td>
                  <td>{message.dlc}</td>
                  <td>{message.sendingNode}</td>
                  <td>{message.description}</td>
                </tr>
              </tbody>
            </table>

            <h4>Signals</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Format</th>
                  <th>Start</th>
                  <th>Length</th>
                  <th>Factor</th>
                  <th>Offset</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Unit</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(message.signals.values()).map((signal) => (
                  <tr key={`${signal.name}-${signal.startBit}`}>
                    <td>{signal.name}</td>
                    <td>{signal.dataType}</td>
                    <td>{signal.endian}</td>
                    <td>{signal.startBit}</td>
                    <td>{signal.length}</td>
                    <td>{signal.factor}</td>
                    <td>{signal.offset}</td>
                    <td>{signal.min}</td>
                    <td>{signal.max}</td>
                    <td>{signal.unit}</td>
                    <td>{signal.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default DbcViewer;
