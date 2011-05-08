mjt.require("MjtWebGlToolkit", function defineMjtWebGlCubeCallback()
{

	MjtWebGlCube = function MjtWebGlCube()
	{
		this.init(MjtWebGlToolkit.getInstance().gl);
	};

	MjtWebGlCube.prototype.joinArrays4 = function joinArrays4()
	{
		var result = [];
		for (i in arguments)
		{
			var array = arguments[i];
			for ( var j = 0; j < 4; j++)
			{
				for ( var k = 0; k < array.length; k++)
				{
					result[result.length] = array[k];
				}
			}
		}
		return result;
	};

	MjtWebGlCube.prototype.init = function init(context)
	{
		this.protoCube = makeBox(context);
		context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.protoCube.indexObject);

		MjtWebGlToolkit.getInstance().updateVertexShaderAttribute("vNormal", this.protoCube.normalObject, context.FLOAT, 3);
		MjtWebGlToolkit.getInstance().updateVertexShaderAttribute("vPosition", this.protoCube.vertexObject, context.FLOAT, 3);
	};

	
	MjtWebGlCube.prototype.paint = function paint(context, modelViewMatrixFloat32)
	{
		context.uniformMatrix4fv(MjtWebGlToolkit.getInstance().getUniformLocation("u_modelViewMatrix"), false, modelViewMatrixFloat32);
		context.drawElements(context.TRIANGLES, this.protoCube.numIndices, context.UNSIGNED_BYTE, 0);
	};

	mjt.singletonify(MjtWebGlCube);

});