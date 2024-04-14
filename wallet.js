document.addEventListener('DOMContentLoaded', (event) => {
  
  let bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
  let upiIds = JSON.parse(localStorage.getItem('upiIds')) || [];
  let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

  

  // Function to update the dropdowns for bank accounts and UPI IDs
  function updateDropdowns() {
    const bankAccountSelect = document.querySelector('#bank-account');
    const upiIdSelect = document.querySelector('#upi-id');

    // Clear existing options
    bankAccountSelect.innerHTML = '<option value="">Select Account</option>';
    upiIdSelect.innerHTML = '<option value="">Select UPI ID</option>';

    // Populate bank account dropdown
    bankAccounts.forEach(account => {
      const option = document.createElement('option');
      option.value = account;
      option.textContent = account;
      bankAccountSelect.appendChild(option);
    });

    // Populate UPI ID dropdown
    upiIds.forEach(id => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = id;
      upiIdSelect.appendChild(option);
    });
  }

  // Function to update the transaction history display
  function updateTransactionHistory() {
    const tableBody = document.querySelector('#history tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    transactionHistory.forEach(transaction => {
      const row = document.createElement('tr');
      // Create cells for date, description, and amount
      const dateCell = document.createElement('td');
      dateCell.textContent = transaction.date;
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = transaction.description;
      const amountCell = document.createElement('td');
      amountCell.innerHTML = `₹${transaction.amount.toFixed(2)}`;
      amountCell.className = transaction.amount < 0 ? 'negative' : 'positive';
      // Append cells to the row
      row.appendChild(dateCell);
      row.appendChild(descriptionCell);
      row.appendChild(amountCell);
      // Append the row to the table body
      tableBody.appendChild(row);
    });
  }

  // Call the update functions to initialize the dropdowns and transaction history
  updateDropdowns();
  updateTransactionHistory();

  // Event listener for the transfer method selection
  

  // Function to handle adding a bank account
  function addBankAccount(accountNumber) {
    if (!bankAccounts.includes(accountNumber)) {
      bankAccounts.push(accountNumber);
      localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
      updateDropdowns();
    } else {
      alert('This bank account is already added.');
    }
  }

  // Function to handle adding a UPI ID
  function addUpiId(upiId) {
    if (!upiIds.includes(upiId)) {
      upiIds.push(upiId);
      localStorage.setItem('upiIds', JSON.stringify(upiIds));
      updateDropdowns();
    } else {
      alert('This UPI ID is already added.');
    }
  }

  // Event listeners for adding bank accounts and UPI IDs
  document.querySelector('#add-account form').addEventListener('submit', (e) => {
    e.preventDefault();
    const accountNumber = document.querySelector('#account-number').value;
    addBankAccount(accountNumber);
    document.querySelector('#account-number').value = ''; // Clear the input field
  });

  document.querySelector('#add-upi form').addEventListener('submit', (e) => {
    e.preventDefault();
    const upiId = document.querySelector('#upi-id').value;
    addUpiId(upiId);
    document.querySelector('#upi-id').value = ''; // Clear the input field
  });

  // Function to handle fund transfers
  function transferFunds(amount, account, method) {
    // Placeholder for actual transfer logic
    // In a real application, you would handle the transfer on the server-side
    console.log(`Transferred ₹${amount} to ${account} via ${method}`);
  }

  // Event listener for the transfer form submission
  document.querySelector('#transfer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const transferMethod = document.querySelector('#transfer-method').value;
    const selectedAccount = transferMethod === 'bank' ? document.querySelector('#bank-account').value : document.querySelector('#upi-id').value;
    const amount = parseFloat(document.querySelector('#amount').value);

    if (amount > 0 && (transferMethod === 'bank' && selectedAccount !== "" || transferMethod === 'upi' && selectedAccount !== "")) {
      transferFunds(amount, selectedAccount, transferMethod);

      // Add transaction to local storage and update history
      transactionHistory.push({
        date: new Date().toLocaleDateString(),
        description: `Transfer to ${selectedAccount} via ${transferMethod}`,
        amount: -amount
      });
      localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
      updateTransactionHistory();

      // Clear the form fields
      document.querySelector('#transfer-method').value = '';
      document.querySelector('#bank-account').value = '';
      document.querySelector('#upi-id').value = '';
      document.querySelector('#amount').value = '';
    } else {
      alert('Please enter a valid amount and select an account or UPI ID.');
    }
  });

  function updateAccountList() {
    const accountList = document.querySelector('#account-list');
    accountList.innerHTML = ''; // Clear existing options

    if (document.querySelector('#transfer-method').value === 'bank') {
      // Populate with bank accounts
      bankAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account;
        option.textContent = account;
        accountList.appendChild(option);
      });
    } else if (document.querySelector('#transfer-method').value === 'upi') {
      // Populate with UPI IDs
      upiIds.forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = id;
        accountList.appendChild(option);
      });
    }
  }

  // Call the update function when transfer method changes
  document.querySelector('#transfer-method').addEventListener('change', updateAccountList)
  document.querySelector('#transfer-method').addEventListener('change', (e) => {
    const method = e.target.value;
    const bankAccountSelection = document.querySelector('#bank-account-selection');
    const upiIdSelection = document.querySelector('#upi-id-selection');

    // Show the appropriate dropdown based on the transfer method
    if (method === 'bank') {
      bankAccountSelection.style.display = 'block';
      upiIdSelection.style.display = 'none';
    } else if (method === 'upi') {
      bankAccountSelection.style.display = 'none';
      upiIdSelection.style.display = 'block';
    } else {
      bankAccountSelection.style.display = 'none';
      upiIdSelection.style.display = 'none';
    }
  });
});
