pragma solidity ^0.5.0;

contract ManageDevice {
    address owner;
    uint deviceCount = 0;
    
    struct Device {
        string owner;
        string name;
        string firmware;
        string publicKey;
    }
    
    mapping(uint => Device) public devices;
    
    function registerDevice(string memory _deviceOwner, 
                            string memory _deviceName, 
                            string memory _deviceFirmware, 
                            string memory _publicKey) public {
        devices[deviceCount] = Device(_deviceOwner, _deviceName, _deviceFirmware, _publicKey);
        deviceCount++;
    }
}