interface MedalProps {
  className?: string;
}

const Medal = ({ className }: MedalProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 20C13.25 20 14.3127 19.5627 15.188 18.688C16.0633 17.8133 16.5007 16.7507 16.5 15.5C16.4993 14.2493 16.062 13.187 15.188 12.313C14.314 11.439 13.2513 11.0013 12 11C10.7487 10.9987 9.68633 11.4363 8.813 12.313C7.93967 13.1897 7.502 14.252 7.5 15.5C7.498 16.748 7.93567 17.8107 8.813 18.688C9.69033 19.5653 10.7527 20.0027 12 20ZM9.075 9.7C9.40833 9.51667 9.76267 9.371 10.138 9.263C10.5133 9.155 10.8923 9.084 11.275 9.05L8.75 4H6.25L9.075 9.7ZM14.925 9.7L17.775 4H15.25L13.125 8.25L13.6 9.2C13.8333 9.26667 14.0583 9.33767 14.275 9.413C14.4917 9.48833 14.7083 9.584 14.925 9.7ZM6.4 18.8C6.11667 18.3167 5.89567 17.796 5.737 17.238C5.57833 16.68 5.49933 16.1007 5.5 15.5C5.50067 14.8993 5.58 14.3203 5.738 13.763C5.896 13.2057 6.11667 12.6847 6.4 12.2C5.7 12.4333 5.125 12.846 4.675 13.438C4.225 14.03 4 14.7173 4 15.5C4 16.2827 4.225 16.9703 4.675 17.563C5.125 18.1557 5.7 18.568 6.4 18.8ZM17.6 18.8C18.3 18.5667 18.875 18.1543 19.325 17.563C19.775 16.9717 20 16.284 20 15.5C20 14.716 19.775 14.0287 19.325 13.438C18.875 12.8473 18.3 12.4347 17.6 12.2C17.8833 12.6833 18.1043 13.2043 18.263 13.763C18.4217 14.3217 18.5007 14.9007 18.5 15.5C18.4993 16.0993 18.42 16.6787 18.262 17.238C18.104 17.7973 17.8833 18.318 17.6 18.8ZM12 22C11.3333 22 10.696 21.904 10.088 21.712C9.48 21.52 8.91733 21.258 8.4 20.926C8.25 20.9593 8.1 20.9803 7.95 20.989C7.8 20.9977 7.64167 21.0013 7.475 21C5.95833 21 4.66667 20.4667 3.6 19.4C2.53333 18.3333 2 17.0417 2 15.525C2 14.075 2.48333 12.8333 3.45 11.8C4.41667 10.7667 5.60833 10.1917 7.025 10.075L3 2H10L12 6L14 2H21L17 10.025C18.4167 10.1583 19.6043 10.7417 20.563 11.775C21.5217 12.8083 22.0007 14.05 22 15.5C22 17.0333 21.4667 18.3333 20.4 19.4C19.3333 20.4667 18.0333 21 16.5 21C16.35 21 16.196 20.996 16.038 20.988C15.88 20.98 15.7257 20.959 15.575 20.925C15.0583 21.2583 14.5 21.521 13.9 21.713C13.3 21.905 12.6667 22.0007 12 22ZM10.15 18.25L10.85 15.975L9 14.65H11.275L12 12.25L12.725 14.65H15L13.15 15.975L13.85 18.25L12 16.85L10.15 18.25Z"
        fill="white"
      />
    </svg>
  );
};

export default Medal;