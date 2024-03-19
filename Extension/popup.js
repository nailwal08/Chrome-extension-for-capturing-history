document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('downloadLinks').addEventListener('click', function () {
      chrome.storage.local.get({ links: [] }, function (data) {
        var linksText = data.links.map(function (link) {
          return link.url + ' - ' + (link.title || link.url);
        }).join('\n');
  
        var blob = new Blob([linksText], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'history.txt';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  });
  