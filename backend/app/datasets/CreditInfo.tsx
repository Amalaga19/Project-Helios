import React from 'react';
import { Card, CardBody, Tooltip } from '@nextui-org/react';
import { Link } from '@nextui-org/react';

interface CreditInfoProps {
  creditLimit: string;
  currentBalance: string;
  availableCredit: string;
  lastPayment: {
    amount: string;
    date: string;
    method: string;
    confirmationNumber: string;
  };
  nextPayment: {
    amount: string;
    dueDate: string;
  };
  billingCycle: string;
}

const CreditInfo: React.FC<CreditInfoProps> = ({
  creditLimit,
  currentBalance,
  availableCredit,
  lastPayment,
  nextPayment,
  billingCycle,
}) => {
  const creditLimitValue = parseFloat(creditLimit.replace(/[$,]/g, ''));
  const currentBalanceValue = parseFloat(currentBalance.replace(/[$,]/g, ''));
  const availableCreditValue = parseFloat(availableCredit.replace(/[$,]/g, ''));

  const creditUsagePercentage = (currentBalanceValue / creditLimitValue) * 100;
  const availableCreditPercentage = (availableCreditValue / creditLimitValue) * 100;

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full">
      <CardBody className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Credit Card Balance</h3>
        
        {/* Credit Limit Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-700 dark:text-gray-300">${creditLimitValue.toFixed(2)} limit</span>
          </div>
          <div className="relative w-full bg-gray-300 rounded h-4">
            <div className="absolute top-0 left-0 h-4 bg-black rounded" style={{ width: `${creditUsagePercentage}%` }}>
              <span className="absolute inset-y-0 right-0 mr-2 text-xs font-semibold text-white">{currentBalance}</span>
            </div>
            <div className="absolute top-0 left-0 h-4 bg-teal-500 rounded" style={{ width: `${creditUsagePercentage + availableCreditPercentage}%` }} />
          </div>
        </div>

        {/* Spent and Available */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2 bg-black rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">Spent</span>
            </div>
            <span className="text-gray-900 dark:text-gray-100">{currentBalance}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2 bg-teal-500 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">Available</span>
            </div>
            <span className="text-gray-900 dark:text-gray-100">{availableCredit}</span>
          </div>
        </div>

        {/* Payment Information */}
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Last Payment Made:</span>
            <span className="text-gray-900 dark:text-gray-100"> {lastPayment.amount} on {lastPayment.date}</span>
            <Tooltip content={`Last Payment: ${lastPayment.amount}\nDate: ${lastPayment.date}\nMethod: ${lastPayment.method}\nConfirmation #: ${lastPayment.confirmationNumber}`}>
              <span className="text-blue-500 cursor-pointer"> (Details)</span>
            </Tooltip>
          </div>
          <div>
            <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Next Payment Due:</span>
            <span className="text-gray-900 dark:text-gray-100"> {nextPayment.amount} due on {nextPayment.dueDate} <span className="text-blue-500 cursor-pointer">(Set Reminder)</span></span>
            <Tooltip content={`Next Payment: ${nextPayment.amount}\nDue Date: ${nextPayment.dueDate}\nClick here to set up a reminder`}>
            </Tooltip>
          </div>
          <div>
            <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Billing Cycle:</span>
            <span className="text-gray-900 dark:text-gray-100"> {billingCycle}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 mt-4">
          <Link href="/payment-history" className="text-blue-500 cursor-pointer">View Payment History</Link>
          <Link href="/make-payment" className="text-blue-500 cursor-pointer">Make a Payment</Link>
          <Link href="/request-credit-increase" className="text-blue-500 cursor-pointer">Request Credit Increase</Link>
          <Link href="/set-up-alerts" className="text-blue-500 cursor-pointer">Set Up Alerts</Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default CreditInfo;
