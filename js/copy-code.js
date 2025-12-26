document.addEventListener('DOMContentLoaded', function() {
  var codeBlocks = document.querySelectorAll('figure.highlight');

  codeBlocks.forEach(function(codeBlock) {
    // 1. Create wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'code-container';
    
    // 2. Insert wrapper before codeBlock
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    
    // 3. Move codeBlock into wrapper
    wrapper.appendChild(codeBlock);
    
    // 4. Create copy button
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.title = 'Copy code';
    
    // 5. Append button to wrapper
    wrapper.appendChild(copyBtn);
    
    // 6. Event listener
    copyBtn.addEventListener('click', function() {
      // Find the code text
      // Hexo with line numbers puts code in td.code pre
      // Hexo without line numbers puts code in pre
      var code = codeBlock.querySelector('td.code pre');
      if (!code) {
        code = codeBlock.querySelector('pre');
      }
      
      if (!code) return;

      var text = code.innerText;
      
      navigator.clipboard.writeText(text).then(function() {
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.classList.add('copied');
        setTimeout(function() {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
          copyBtn.classList.remove('copied');
        }, 2000);
      }, function(err) {
        console.error('Failed to copy: ', err);
        copyBtn.innerHTML = '<i class="fas fa-times"></i>';
      });
    });
  });
});