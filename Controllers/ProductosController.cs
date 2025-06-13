using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Sistema_comercial.Models;
using System.Collections;

namespace Sistema_comercial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly SistemaComercialContext _context;

        public ProductosController(SistemaComercialContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> Get([FromQuery] int pageNumber =1, [FromQuery] int pageSize=10)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            var totalItems = _context.Productos.Count();
            var totalPages = (int)Math.Ceiling((double)totalItems/pageSize);

            var products = await _context.Productos
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new
            {
                Count = totalItems,
                ActualPage = pageNumber,
                Pages= totalPages,
                Result = products
            };

            return Ok(result);
        }

        [HttpGet("{ID:int}")]
        public async Task<ActionResult<IEnumerable<Producto>>>GetbyID(int ID)
        {
            var result = await _context.Productos.FindAsync(ID);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<Producto>>>GetByName(string name)
        {
            if (name == null) return NotFound();
            var result = await _context.Productos.Where(e=> e.Nombre.Contains(name)).ToListAsync();
            return result.Count == 0 ? NotFound() : Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Producto producto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Productos.Add(producto);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Create), new { id = producto.Id }, producto);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Producto producto, int id)
        {
            if(id != producto.Id)
            {
                return BadRequest();
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(producto);
            }
            catch (DbUpdateException)
            {
                if(!_context.Productos.Any(p=> p.Id == id))
                {
                    return NotFound();
                }
            }
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete (int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
