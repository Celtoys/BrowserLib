//
// This will generate a closure for the given function and optionally bind an arbitrary number of
// its initial arguments to specific values.
//
// Parameters:
//
//    0: Either the function scope or the function.
//    1: If 0 is the function scope, this is the function.
//       Otherwise it's the start of the optional bound argument list.
//    2: Start of the optional bound argument list if 1 is the function.
//
// Examples:
//
//    function GlobalFunction(p0, p1, p2) { }
//    function ThisFunction(p0, p1, p2) { }
//
//    var a = Bind("GlobalFunction");
//    var b = Bind(this, "ThisFunction");
//    var c = Bind("GlobalFunction", BoundParam0, BoundParam1);
//    var d = Bind(this, "ThisFunction", BoundParam0, BoundParam1);
//
//    a(0, 1, 2);
//    b(0, 1, 2);
//    c(2);
//    d(2);
//
function Bind()
{
	// No closure to define?
	if (arguments.length == 0)
		return null;

	// Locate the function and its scope within the argument list
	var scope = window;
	var func = arguments[0];
	var start = 1;
	if (typeof(arguments[0]) != "string")
	{
		scope = arguments[0];
		func = arguments[1];
		start = 2;
	}

	// Convert the arguments list to an array
	var arg_array = Array.prototype.slice.call(arguments, start);

	// Lookup the function and mark where argument concatenation begins
	func = scope[func];
	start = arg_array.length;

	return function()
	{
		// Concatenate incoming arguments
		for (var i = 0; i < arguments.length; i++)
			arg_array[start + i] = arguments[i];

		// Call the function in the given scope with the new arguments
		return func.apply(scope, arg_array);
	}
}
