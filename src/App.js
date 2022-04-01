/*global chrome*/

import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const TableRow = (props) => {
  return (
    <tr>
      <td><input type="radio" name="courseware" value={props.index} /></td>
      <td><div className="file-info">{props.upload.fileInfo.name}</div></td>
      <td></td>
    </tr>
  )
}

const TableBody = (props) => {
  return (
    <tbody>
      {
        props.uploads.map((u, i) => {
          return <TableRow key={i} index={i} upload={u} />
        })
      }
    </tbody>
  )
}

function onError(error) {
  console.log(`Error: ${error}`);
}

const handleClick = () => {
  var checkboxes = document.getElementsByName('courseware');
    var ids = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            ids.push(checkboxes[i].value);
        }
    }
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        for (let i of ids) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                  from: 'popup',
                  subject: 'startDownloads',
                  reference_id: uploads[i].fileInfo.reference_id,
                  uindex: i
                }
            ).then().catch(onError);
        }
    });
}

const CWTable = (props) => {
  return (
    <Table hover size="sm">
      <thead className='theader'>
        <th>
          {/* <input type="checkbox" id="select-all"> */}
        </th>
        <th>课件名</th>
        <th style={{cursor: "pointer"}}>
          <FontAwesomeIcon onClick={handleClick} icon={faDownload} />
        </th>
      </thead>
      <TableBody uploads={props.uploads} />
    </Table>
  )
}

const Coursewares = (props) => {
  if (props.uploads && props.uploads.length === 0) {
    return (
      <>
        <nobr>当前课程没有可下载的课件</nobr>
      </>
    );
  } else if (props.uploads && props.uploads.length > 0) {
    return (
      <>
        <CWTable uploads={props.uploads} />
      </>
    );
  } else if (props.uploads === null) {
    return (
      <>
        <nobr>正在获取课件列表...</nobr>
      </>
    );
  } else {
    return (
      <>
        <nobr>未选中课程页面</nobr>
      </>
    );
  }
}

let uploads;
window.addEventListener('load', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'getUploads'},
    function(response) {
      uploads = response.uploads;
    });
  });
});

const App = () => {
  const [state, setState] = useState(null);

  setTimeout(() => {
    setState(uploads);
  }, 200);
  
  return (
    <div className='container'>
      <Coursewares uploads={state}/>
    </div>
  );
}

export default App;