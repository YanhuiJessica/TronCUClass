/*global chrome*/

import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const TableRow = (props) => {
  return (
    <tr>
      <td><input type="radio" name="courseware" value={props.index} /></td>
      <td>{props.upload.fileInfo.name}</td>
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

const Table = (props) => {
  return (
    <table>
      <thead>
        <th>
          {/* <input type="checkbox" id="select-all"> */}
        </th>
        <th>课件名</th>
        <th style={{cursor: "pointer"}}>
          <FontAwesomeIcon onClick={handleClick} icon={faDownload} />
        </th>
      </thead>
      <TableBody uploads={props.uploads} />
    </table>
  )
}

const Coursewares = (props) => {
  if (props.uploads && props.uploads.length === 0) {
    return (
      <>
        <p>当前课程没有可下载的课件</p>
      </>
    );
  } else if (props.uploads && props.uploads.length > 0) {
    return (
      <>
        <Table uploads={props.uploads} />
      </>
    );
  } else if (props.uploads === null) {
    return (
      <>
        <p>正在获取课件列表...</p>
      </>
    );
  } else {
    return (
      <>
        <p>未选中课程页面</p>
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
  }, 500);
  
  return (
    <>
      <Coursewares uploads={state}/>
    </>
  );
}

export default App;